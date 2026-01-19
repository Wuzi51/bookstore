import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/user';
import { Card, Form, Input, Button, message, Divider } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { userApi } from '@/api/user';

const Profile = () => {
  const { session, setSession } = useUserStore();
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      const metadata = session.user.user_metadata || {};
      profileForm.setFieldsValue({
        email: session.user.email,
        fullName: metadata.fullName || '',
        phone: metadata.phone || '',
        address: metadata.address || '',
      });
    } else {
      profileForm.resetFields();
      passwordForm.resetFields();
    }
  }, [session, profileForm, passwordForm]);

  const handleUpdateProfile = async (values) => {
    setProfileLoading(true);
    try {
      const updatedUser = await userApi.updateProfile({
        fullName: values.fullName?.trim() || '',
        phone: values.phone?.trim() || '',
        address: values.address?.trim() || '',
      });

      if (updatedUser && session) {
        setSession({ ...session, user: updatedUser });
      }

      messageApi.success('個人資料更新成功');
    } catch (error) {
      messageApi.error(error?.message || '更新失敗，請稍後再試');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleUpdatePassword = async (values) => {
    if (!values.newPassword) {
      messageApi.warning('請輸入新密碼');
      return;
    }
    if (values.newPassword !== values.confirmPassword) {
      messageApi.warning('兩次輸入的密碼不一致');
      return;
    }

    setPasswordLoading(true);
    try {
      await userApi.updatePassword(values.newPassword);
      messageApi.success('密碼更新成功');
      passwordForm.resetFields();
    } catch (error) {
      messageApi.error(error?.message || '密碼更新失敗，請稍後再試');
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!session?.user) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <div className="text-center">
            <UserOutlined className="text-4xl mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">請先登入</h3>
            <p className="text-gray-500">您需要登入才能查看個人資料</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      {contextHolder}
      <Card title="個人資料" className="mb-6">
        <Form
          form={profileForm}
          layout="vertical"
          onFinish={handleUpdateProfile}
          autoComplete="off"
        >
          <Form.Item
            label="電子郵件"
            name="email"
            rules={[
              { required: true, message: '請輸入電子郵件' },
              { type: 'email', message: '請輸入有效的電子郵件格式' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="輸入您的電子郵件" disabled />
          </Form.Item>

          <Form.Item label="姓名" name="fullName">
            <Input prefix={<UserOutlined />} placeholder="輸入您的姓名" />
          </Form.Item>

          <Form.Item
            label="聯絡電話"
            name="phone"
            rules={[{ pattern: /^[0-9+\-\s]{0,20}$/, message: '請輸入有效的電話格式' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="輸入您的聯絡電話" maxLength={20} />
          </Form.Item>

          <Form.Item label="聯絡地址" name="address">
            <Input prefix={<HomeOutlined />} placeholder="輸入您的聯絡地址" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={profileLoading} className="w-full">
              更新個人資料
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="安全與密碼" className="mb-6">
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handleUpdatePassword}
          autoComplete="off"
        >
          <Form.Item
            label="新密碼"
            name="newPassword"
            rules={[
              { required: true, message: '請輸入新密碼' },
              { min: 6, message: '密碼至少需要 6 個字元' },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="輸入新密碼" />
          </Form.Item>

          <Form.Item
            label="確認新密碼"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '請再次輸入新密碼' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('兩次輸入的密碼不一致'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="再次輸入新密碼" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={passwordLoading} className="w-full">
              重設密碼
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="帳戶資訊">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">註冊時間：</span>
            <span>
              {session.user.created_at
                ? new Date(session.user.created_at).toLocaleDateString()
                : '未知'}
            </span>
          </div>
          <Divider />
          <div className="flex justify-between">
            <span className="text-gray-600">上次登入：</span>
            <span>
              {session.user.last_sign_in_at
                ? new Date(session.user.last_sign_in_at).toLocaleDateString()
                : '未知'}
            </span>
          </div>
          <Divider />
          <div className="flex justify-between">
            <span className="text-gray-600">會員編號：</span>
            <span className="font-mono text-sm break-all">{session.user.id}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
