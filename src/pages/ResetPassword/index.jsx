import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Form, Input, Button, Result, message } from 'antd';
import supabase from '@/lib/supabaseClient';
import { useUserStore } from '@/store/user';

const ResetPassword = () => {
  const { t } = useTranslation();
  const { session } = useUserStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async ({ password, confirmPassword }) => {
    if (password !== confirmPassword) {
      messageApi.warning(t('password_mismatch'));
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        throw error;
      }
      setIsCompleted(true);
      messageApi.success(t('password_updated'));
      form.resetFields();
    } catch (error) {
      messageApi.error(error?.message || t('reset_password_failed'));
      console.error('Reset password error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!session?.user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <Card className="w-full max-w-md text-center">
          <h2 className="text-xl font-semibold mb-4">{t('verifying_link')}</h2>
          <p className="text-gray-600">
            {t('verifying_link_hint')}
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      {contextHolder}
      <Card className="w-full max-w-lg">
        {isCompleted ? (
          <Result
            status="success"
            title={t('reset_password_success')}
            subTitle={t('reset_password_success_hint')}
            extra={[
              <Button key="home" type="primary" href="/">
                {t('go_home')}
              </Button>,
            ]}
          />
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-2 text-center">{t('reset_password')}</h2>
            <p className="text-gray-600 text-sm text-center mb-6">
              {t('reset_password_hint')}
            </p>
            <Form layout="vertical" form={form} onFinish={handleFinish}>
              <Form.Item
                label={t('new_password')}
                name="password"
                rules={[
                  { required: true, message: t('please_enter_new_password') },
                  { min: 6, message: t('password_min_length') },
                ]}
              >
                <Input.Password placeholder={t('new_password_placeholder')} />
              </Form.Item>
              <Form.Item
                label={t('confirm_new_password')}
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: t('please_confirm_password') },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(t('password_mismatch')));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder={t('confirm_password_placeholder')} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                  {t('submit')}
                </Button>
              </Form.Item>
            </Form>
            <div className="text-center text-sm text-gray-500">
              {t('contact_support_hint')}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default ResetPassword;
