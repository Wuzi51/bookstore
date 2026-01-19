import { useState } from 'react';
import { Card, Form, Input, Button, Result, message } from 'antd';
import supabase from '@/lib/supabaseClient';
import { useUserStore } from '@/store/user';

const ResetPassword = () => {
  const { session } = useUserStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async ({ password, confirmPassword }) => {
    if (password !== confirmPassword) {
      messageApi.warning('兩次輸入的密碼不一致');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        throw error;
      }
      setIsCompleted(true);
      messageApi.success('密碼已成功更新，請使用新密碼登入');
      form.resetFields();
    } catch (error) {
      messageApi.error(error?.message || '重設密碼失敗，請稍後再試');
      console.error('Reset password error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!session?.user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <Card className="w-full max-w-md text-center">
          <h2 className="text-xl font-semibold mb-4">連結驗證中</h2>
          <p className="text-gray-600">
            請透過信箱中的重設密碼連結進入此頁面。如果已點擊連結但仍看到此訊息，請重新整理或再次點擊信件中的連結。
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
            title="密碼重設成功"
            subTitle="您現在可以使用新的密碼進行登入。"
            extra={[
              <Button key="home" type="primary" href="/">
                返回首頁
              </Button>,
            ]}
          />
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-2 text-center">重設密碼</h2>
            <p className="text-gray-600 text-sm text-center mb-6">
              請輸入新的密碼。我們建議您使用至少 6 個字元，並包含大小寫字母與數字，以增強安全性。
            </p>
            <Form layout="vertical" form={form} onFinish={handleFinish}>
              <Form.Item
                label="新密碼"
                name="password"
                rules={[
                  { required: true, message: '請輸入新密碼' },
                  { min: 6, message: '密碼至少需要 6 個字元' },
                ]}
              >
                <Input.Password placeholder="請輸入新密碼" />
              </Form.Item>
              <Form.Item
                label="確認新密碼"
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: '請再次輸入新密碼' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('兩次輸入的密碼不一致'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="請再次輸入新密碼" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                  送出
                </Button>
              </Form.Item>
            </Form>
            <div className="text-center text-sm text-gray-500">
              如需協助，請聯絡客服或重新寄送重設密碼信件。
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default ResetPassword;
