import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile as AntUploadFile } from 'antd/es/upload/interface';
import { useAuth } from '@/context/AuthContext';
import { farmerProductService } from '@/services/farmer/farmerProductService';
import { FarmerProduct, CreateFarmerProductRequest, UpdateFarmerProductRequest } from '@/types/farmerProduct';
import { toast } from 'react-hot-toast';

interface ProductFormModalProps {
  mode: 'create' | 'edit';
  product: FarmerProduct | null;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface UploadFile extends AntUploadFile {
  originFileObj?: RcFile;
}

interface FormValues {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  originInfo: string;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  mode,
  product,
  visible,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm<FormValues>();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (visible && product) {
      form.setFieldsValue({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        originInfo: product.originInfo,
      });
      setFileList(product.imageUrls.map((url, index) => ({
        uid: `-${index}`,
        name: `image-${index}.jpg`,
        status: 'done',
        url,
      })));
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [visible, product, form]);

  const handleSubmit = async (values: FormValues) => {
    if (!token) return;

    try {
      setLoading(true);
      const productData: CreateFarmerProductRequest = {
        name: values.name,
        description: values.description,
        price: values.price,
        stock: values.stock,
        category: values.category,
        originInfo: values.originInfo,
        imageUrls: [],
      };

      let createdProduct: FarmerProduct | null = null;

      if (mode === 'create') {
        createdProduct = await farmerProductService.createProduct(productData, token);
        toast.success('Thêm sản phẩm thành công');
        
        if (createdProduct && fileList.length > 0) {
          const filesToUpload = fileList
            .filter(file => file.originFileObj)
            .map(file => file.originFileObj!);
          
          if (filesToUpload.length > 0) {
            await farmerProductService.uploadImages(createdProduct.id, filesToUpload, token);
            toast.success('Upload ảnh thành công');
          }
        }
      } else if (product) {
        const updateData: UpdateFarmerProductRequest = {
          ...productData,
          id: product.id
        };
        await farmerProductService.updateProduct(product.id, updateData, token);
        toast.success('Cập nhật sản phẩm thành công');
        
        const newFiles = fileList
          .filter(file => file.originFileObj)
          .map(file => file.originFileObj!);
        
        if (newFiles.length > 0) {
          await farmerProductService.uploadImages(product.id, newFiles, token);
          toast.success('Upload ảnh thành công');
        }
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error(mode === 'create' ? 'Lỗi khi thêm sản phẩm' : 'Lỗi khi cập nhật sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: RcFile) => {
    if (!token) return false;

    try {
      const previewUrl = URL.createObjectURL(file);
      
      setFileList(prev => [...prev, {
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: previewUrl,
        originFileObj: file,
      }]);

      return false;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Lỗi khi tải lên hình ảnh');
      return false;
    }
  };

  useEffect(() => {
    return () => {
      fileList.forEach(file => {
        if (file.url && file.url.startsWith('blob:')) {
          URL.revokeObjectURL(file.url);
        }
      });
    };
  }, [fileList]);

  return (
    <Modal
      title={mode === 'create' ? 'Thêm sản phẩm mới' : 'Cập nhật sản phẩm'}
      open={visible}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={() => form.submit()}
      confirmLoading={loading}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          name: '',
          description: '',
          price: 0,
          stock: 0,
          category: '',
          originInfo: '',
        }}
      >
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="price"
          label="Giá"
          rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
        >
          <InputNumber
            min={0}
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => {
              const num = value ? parseInt(value.replace(/\$\s?|(,*)/g, '')) : 0;
              return num as unknown as 0;
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="stock"
          label="Số lượng"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="category"
          label="Danh mục"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
        >
          <Select>
            <Select.Option value="Rau củ">Rau củ</Select.Option>
            <Select.Option value="Trái cây">Trái cây</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="originInfo"
          label="Thông tin nguồn gốc"
          rules={[{ required: true, message: 'Vui lòng nhập thông tin nguồn gốc' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={handleUpload}
            onRemove={file => {
              setFileList(prev => prev.filter(f => f.uid !== file.uid));
            }}
            multiple
          >
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Tải lên</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductFormModal; 