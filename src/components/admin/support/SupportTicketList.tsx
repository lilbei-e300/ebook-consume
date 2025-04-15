import React, { useState, useEffect } from 'react';
import { Table, Tag, Select, Button, Space, Modal, Form, Input, message } from 'antd';
import { supportService, SupportTicket } from '@/services/admin/supportService';
import { formatDate } from '@/lib/date';
import { EyeOutlined, MessageOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const SupportTicketList: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<string>('PENDING');
  const [type, setType] = useState<string>('COMPLAINT');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [replyForm] = Form.useForm();

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await supportService.getSupportTickets(currentPage - 1, pageSize, status, type);
      setTickets(response.tickets);
      setTotal(response.totalElements);
    } catch {
      message.error('Không thể tải danh sách yêu cầu hỗ trợ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [currentPage, pageSize, status, type]);

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    try {
      await supportService.updateTicketStatus(ticketId, newStatus);
      message.success('Cập nhật trạng thái thành công');
      fetchTickets();
    } catch {
      message.error('Cập nhật trạng thái thất bại');
    }
  };

  const handleReply = async (values: { content: string }) => {
    if (!selectedTicket) return;
    try {
      await supportService.replyToTicket(selectedTicket.id, values.content);
      message.success('Gửi phản hồi thành công');
      setReplyModalVisible(false);
      replyForm.resetFields();
      fetchTickets();
    } catch {
      message.error('Gửi phản hồi thất bại');
    }
  };

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: 'Người gửi',
      dataIndex: 'userName',
      key: 'userName',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'userEmail',
      key: 'userEmail',
      width: 200,
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: string) => {
        const typeMap = {
          COMPLAINT: { color: 'red', text: 'Khiếu nại' },
          SUGGESTION: { color: 'blue', text: 'Đề xuất' },
          QUESTION: { color: 'green', text: 'Câu hỏi' },
          OTHER: { color: 'gray', text: 'Khác' },
        };
        const { color, text } = typeMap[type as keyof typeof typeMap] || { color: 'default', text: type };
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string, record: SupportTicket) => {
        return (
          <Select
            value={status}
            style={{ width: 120 }}
            onChange={(value) => handleStatusChange(record.id, value)}
          >
            <Option value="PENDING">Chờ xử lý</Option>
            <Option value="PROCESSING">Đang xử lý</Option>
            <Option value="RESOLVED">Đã giải quyết</Option>
            <Option value="CLOSED">Đã đóng</Option>
          </Select>
        );
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      render: (_: unknown, record: SupportTicket) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedTicket(record);
              setReplyModalVisible(true);
            }}
          />
          <Button
            type="text"
            icon={<MessageOutlined />}
            onClick={() => {
              setSelectedTicket(record);
              setReplyModalVisible(true);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <div className="flex gap-4">
          <Select
            value={status}
            style={{ width: 150 }}
            onChange={setStatus}
          >
            <Option value="PENDING">Chờ xử lý</Option>
            <Option value="PROCESSING">Đang xử lý</Option>
            <Option value="RESOLVED">Đã giải quyết</Option>
            <Option value="CLOSED">Đã đóng</Option>
          </Select>
          <Select
            value={type}
            style={{ width: 150 }}
            onChange={setType}
          >
            <Option value="COMPLAINT">Khiếu nại</Option>
            <Option value="SUGGESTION">Đề xuất</Option>
            <Option value="QUESTION">Câu hỏi</Option>
            <Option value="OTHER">Khác</Option>
          </Select>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={tickets}
        rowKey="id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
      />

      <Modal
        title="Chi tiết yêu cầu hỗ trợ"
        open={replyModalVisible}
        onCancel={() => {
          setReplyModalVisible(false);
          setSelectedTicket(null);
        }}
        footer={null}
        width={800}
      >
        {selectedTicket && (
          <div>
            <div className="mb-4">
              <h3 className="font-semibold">Tiêu đề:</h3>
              <p>{selectedTicket.title}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Nội dung:</h3>
              <p>{selectedTicket.content}</p>
            </div>
            <Form
              form={replyForm}
              onFinish={handleReply}
              layout="vertical"
            >
              <Form.Item
                name="content"
                label="Phản hồi"
                rules={[{ required: true, message: 'Vui lòng nhập nội dung phản hồi' }]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Gửi phản hồi
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SupportTicketList; 