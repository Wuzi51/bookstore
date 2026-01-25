import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/store/user';
// bundle-barrel-imports: 直接匯入減少 bundle size
import Card from 'antd/es/card';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import message from 'antd/es/message';
import Divider from 'antd/es/divider';
import UserOutlined from '@ant-design/icons/UserOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import PhoneOutlined from '@ant-design/icons/PhoneOutlined';
import HomeOutlined from '@ant-design/icons/HomeOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';
import { userApi } from '@/api/user';

const Profile = () => {
  const { t } = useTranslation();
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

      messageApi.success(t('profile_update_success'));
    } catch (error) {
      messageApi.error(error?.message || t('profile_update_failed'));
    } finally {
      setProfileLoading(false);
    }
  };

  const handleUpdatePassword = async (values) => {
    if (!values.newPassword) {
      messageApi.warning(t('please_enter_new_password'));
      return;
    }
    if (values.newPassword !== values.confirmPassword) {
      messageApi.warning(t('password_mismatch'));
      return;
    }

    setPasswordLoading(true);
    try {
      await userApi.updatePassword(values.newPassword);
      messageApi.success(t('password_update_success'));
      passwordForm.resetFields();
    } catch (error) {
      messageApi.error(error?.message || t('password_update_failed'));
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
            <h3 className="text-lg font-medium mb-2">{t('please_login_first_title')}</h3>
            <p className="text-gray-500">{t('please_login_to_view_profile')}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      {contextHolder}
      <Card title={t('profile')} className="mb-6">
        <Form
          form={profileForm}
          layout="vertical"
          onFinish={handleUpdateProfile}
          autoComplete="off"
        >
          <Form.Item
            label={t('Email')}
            name="email"
            rules={[
              { required: true, message: t('please_enter_email') },
              { type: 'email', message: t('please_enter_valid_email') },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder={t('email_placeholder')} disabled />
          </Form.Item>

          <Form.Item label={t('full_name')} name="fullName">
            <Input prefix={<UserOutlined />} placeholder={t('name_placeholder')} />
          </Form.Item>

          <Form.Item
            label={t('phone')}
            name="phone"
            rules={[{ pattern: /^[0-9+\-\s]{0,20}$/, message: t('please_enter_valid_phone') }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder={t('phone_placeholder')} maxLength={20} />
          </Form.Item>

          <Form.Item label={t('address')} name="address">
            <Input prefix={<HomeOutlined />} placeholder={t('address_placeholder')} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={profileLoading} className="w-full">
              {t('save')}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={t('security_password')} className="mb-6">
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handleUpdatePassword}
          autoComplete="off"
        >
          <Form.Item
            label={t('new_password')}
            name="newPassword"
            rules={[
              { required: true, message: t('please_enter_new_password') },
              { min: 6, message: t('password_min_length') },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder={t('new_password_placeholder')} />
          </Form.Item>

          <Form.Item
            label={t('confirm_new_password')}
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: t('please_confirm_password') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('password_mismatch')));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder={t('confirm_password_placeholder')} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={passwordLoading} className="w-full">
              {t('update_password')}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={t('account_info')}>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">{t('register_time')}：</span>
            <span>
              {session.user.created_at
                ? new Date(session.user.created_at).toLocaleDateString()
                : t('unknown')}
            </span>
          </div>
          <Divider />
          <div className="flex justify-between">
            <span className="text-gray-600">{t('last_login')}：</span>
            <span>
              {session.user.last_sign_in_at
                ? new Date(session.user.last_sign_in_at).toLocaleDateString()
                : t('unknown')}
            </span>
          </div>
          <Divider />
          <div className="flex justify-between">
            <span className="text-gray-600">{t('member_id')}：</span>
            <span className="font-mono text-sm break-all">{session.user.id}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
