import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/store/user';
import { useBookStore } from '@/store/book';
// bundle-barrel-imports: 直接匯入減少 bundle size
import Card from 'antd/es/card';
import Table from 'antd/es/table';
import Tag from 'antd/es/tag';
import Button from 'antd/es/button';
import Empty from 'antd/es/empty';
import message from 'antd/es/message';
import Spin from 'antd/es/spin';
import Drawer from 'antd/es/drawer';
import List from 'antd/es/list';
import Avatar from 'antd/es/avatar';
import Space from 'antd/es/space';
import Divider from 'antd/es/divider';
import Grid from 'antd/es/grid';
import ShoppingOutlined from '@ant-design/icons/ShoppingOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import BookOutlined from '@ant-design/icons/BookOutlined';

const STATUS_COLORS = {
  pending: 'orange',
  completed: 'green',
  cancelled: 'red',
  shipped: 'blue',
};

const formatCurrency = (value) => `NT$${Number(value || 0).toLocaleString('zh-TW')}`;

const formatDateTime = (value) =>
  value ? new Date(value).toLocaleString('zh-TW', { hour12: false }) : '-';

const OrderHistory = () => {
  const { t } = useTranslation();
  const { session } = useUserStore();
  const { orderList, fetchOrderList } = useBookStore();
  const screens = Grid.useBreakpoint();
  const isDesktop = screens?.md ?? false;
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const resolveStatus = (status) => ({
    color: STATUS_COLORS[status] || 'default',
    text: t(`status_${status}`) || t('status_unknown'),
  });

  useEffect(() => {
    const loadOrders = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        await fetchOrderList(session.user.id);
      } catch (error) {
        messageApi.error(t('order_load_failed'));
        console.error('Failed to load orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [session?.user?.id, fetchOrderList, messageApi]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedOrder(null);
  };

  const dataSource = Array.isArray(orderList) ? orderList : [];

  const columns = [
    {
      title: t('order_id'),
      dataIndex: 'id',
      key: 'id',
      render: (id) => <span className="font-mono">#{id}</span>,
    },
    {
      title: t('order_date'),
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => formatDateTime(date),
    },
    {
      title: t('item_count'),
      dataIndex: 'items',
      key: 'items',
      render: (items) => (Array.isArray(items) ? items.length : 0),
    },
    {
      title: t('Total_Amount'),
      dataIndex: 'total',
      key: 'total',
      render: (total) => formatCurrency(total),
    },
    {
      title: t('order_status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const { color, text } = resolveStatus(status);
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: t('action'),
      key: 'action',
      render: (_, record) => (
        <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewOrder(record)}>
          {t('view_details')}
        </Button>
      ),
    },
  ];

  if (!session?.user) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <div className="text-center">
            <ShoppingOutlined className="text-4xl mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">{t('please_login_first_title')}</h3>
            <p className="text-gray-500">{t('please_login_to_view_orders')}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      {contextHolder}
      <Card
        title={
          <div className="flex items-center gap-2">
            <ShoppingOutlined />
            <span>{t('order_details')}</span>
          </div>
        }
      >
        <Spin spinning={loading}>
          {dataSource.length > 0 ? (
            isDesktop ? (
              <Table
                columns={columns}
                dataSource={dataSource}
                rowKey="id"
                scroll={{ x: 720 }}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total) => t('total_orders', { total }),
                }}
              />
            ) : (
              <List
                dataSource={dataSource}
                pagination={{
                  pageSize: 5,
                  showSizeChanger: false,
                }}
                renderItem={(order) => {
                  const statusMeta = resolveStatus(order.status);
                  const itemCount = Array.isArray(order.items) ? order.items.length : 0;

                  return (
                    <List.Item>
                      <Card size="small" className="w-full">
                        <Space direction="vertical" className="w-full">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{t('order_id')} #{order.id}</span>
                            <Tag color={statusMeta.color}>{statusMeta.text}</Tag>
                          </div>
                          <div className="text-sm text-gray-500 space-y-1">
                            <div>{t('order_date')}：{formatDateTime(order.created_at)}</div>
                            <div>{t('item_count')}：{itemCount}</div>
                            <div>{t('Total_Amount')}：{formatCurrency(order.total)}</div>
                          </div>
                          <Button
                            block
                            icon={<EyeOutlined />}
                            onClick={() => handleViewOrder(order)}
                          >
                            {t('view_details')}
                          </Button>
                        </Space>
                      </Card>
                    </List.Item>
                  );
                }}
              />
            )
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('no_order_records')}>
              <Button type="primary" href="/">
                {t('Go_Shopping')}
              </Button>
            </Empty>
          )}
        </Spin>
      </Card>
      <Drawer
        placement={isDesktop ? 'right' : 'bottom'}
        width={isDesktop ? 480 : '100%'}
        height={isDesktop ? undefined : '80%'}
        open={isDrawerOpen}
        onClose={closeDrawer}
        title={
          selectedOrder ? (
            <div className="flex items-center gap-2">
              <ShoppingOutlined />
              <span>{t('order_id')} #{selectedOrder.id}</span>
            </div>
          ) : (
            t('order_details')
          )
        }
      >
        {selectedOrder ? (
          <Space direction="vertical" size="large" className="w-full">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>{t('order_date')}</span>
                <span>{formatDateTime(selectedOrder.created_at)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{t('Total_Amount')}</span>
                <span>{formatCurrency(selectedOrder.total)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{t('order_status')}</span>
                {(() => {
                  const { color, text } = resolveStatus(selectedOrder.status);
                  return <Tag color={color}>{text}</Tag>;
                })()}
              </div>
            </div>
            <Divider />
            <List
              dataSource={selectedOrder.items || []}
              locale={{ emptyText: t('no_items_in_order') }}
              renderItem={(item) => {
                const quantity = item?.quantity ?? 1;
                const lineTotal = Number(item?.price || 0) * quantity;
                const cover =
                  item?.cover_image ||
                  item?.books?.cover_image ||
                  item?.book?.cover_image ||
                  item?.img ||
                  null;
                const title =
                  item?.title || item?.books?.title || item?.book?.title || t('unnamed_product');
                const author = item?.author || item?.books?.author || item?.book?.author;

                return (
                  <List.Item key={item?.id}>
                    <div className="flex w-full gap-4">
                      <div className="flex-shrink-0 w-20 h-24 rounded-md overflow-hidden bg-gray-100">
                        {cover ? (
                          <img src={cover} alt={title} className="w-full h-full object-contain" />
                        ) : (
                          <Avatar
                            shape="square"
                            size={80}
                            icon={<BookOutlined />}
                            className="w-full h-full flex items-center justify-center text-xl"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{title}</div>
                            {author && <div className="text-sm text-gray-500">{author}</div>}
                          </div>
                          <div className="text-right font-medium">{formatCurrency(lineTotal)}</div>
                        </div>
                        <div className="mt-2 text-sm text-gray-500 space-y-1">
                          <div>{t('unit_price')}：{formatCurrency(item?.price)}</div>
                          <div>{t('quantity')}：{quantity}</div>
                        </div>
                      </div>
                    </div>
                  </List.Item>
                );
              }}
            />
          </Space>
        ) : (
          <Empty description={t('no_order_selected')} />
        )}
      </Drawer>
    </div>
  );
};

export default OrderHistory;
