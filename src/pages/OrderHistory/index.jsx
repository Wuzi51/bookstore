import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/user';
import { useBookStore } from '@/store/book';
import {
  Card,
  Table,
  Tag,
  Button,
  Empty,
  message,
  Spin,
  Drawer,
  List,
  Avatar,
  Space,
  Divider,
  Grid,
} from 'antd';
import { ShoppingOutlined, EyeOutlined, BookOutlined } from '@ant-design/icons';

const STATUS_MAP = {
  pending: { color: 'orange', text: '處理中' },
  completed: { color: 'green', text: '已完成' },
  cancelled: { color: 'red', text: '已取消' },
  shipped: { color: 'blue', text: '已出貨' },
};

const formatCurrency = (value) => `NT$${Number(value || 0).toLocaleString('zh-TW')}`;

const formatDateTime = (value) =>
  value ? new Date(value).toLocaleString('zh-TW', { hour12: false }) : '-';

const resolveStatus = (status) => STATUS_MAP[status] || { color: 'default', text: '未知' };

const OrderHistory = () => {
  const { session } = useUserStore();
  const { orderList, fetchOrderList } = useBookStore();
  const screens = Grid.useBreakpoint();
  const isDesktop = screens?.md ?? false;
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
        messageApi.error('載入訂單失敗');
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
      title: '訂單編號',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <span className="font-mono">#{id}</span>,
    },
    {
      title: '訂單日期',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => formatDateTime(date),
    },
    {
      title: '商品數量',
      dataIndex: 'items',
      key: 'items',
      render: (items) => (Array.isArray(items) ? items.length : 0),
    },
    {
      title: '總金額',
      dataIndex: 'total',
      key: 'total',
      render: (total) => formatCurrency(total),
    },
    {
      title: '訂單狀態',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const { color, text } = resolveStatus(status);
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewOrder(record)}>
          查看詳情
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
            <h3 className="text-lg font-medium mb-2">請先登入</h3>
            <p className="text-gray-500">您需要登入才能查看訂單歷史</p>
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
            <span>訂單歷史</span>
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
                  showTotal: (total) => `共 ${total} 筆訂單`,
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
                            <span className="font-semibold">訂單 #{order.id}</span>
                            <Tag color={statusMeta.color}>{statusMeta.text}</Tag>
                          </div>
                          <div className="text-sm text-gray-500 space-y-1">
                            <div>訂單日期：{formatDateTime(order.created_at)}</div>
                            <div>商品數量：{itemCount}</div>
                            <div>總金額：{formatCurrency(order.total)}</div>
                          </div>
                          <Button
                            block
                            icon={<EyeOutlined />}
                            onClick={() => handleViewOrder(order)}
                          >
                            查看詳情
                          </Button>
                        </Space>
                      </Card>
                    </List.Item>
                  );
                }}
              />
            )
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="尚無訂單記錄">
              <Button type="primary" href="/">
                開始購物
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
              <span>訂單 #{selectedOrder.id}</span>
            </div>
          ) : (
            '訂單詳情'
          )
        }
      >
        {selectedOrder ? (
          <Space direction="vertical" size="large" className="w-full">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>訂單日期</span>
                <span>{formatDateTime(selectedOrder.created_at)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>總金額</span>
                <span>{formatCurrency(selectedOrder.total)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>訂單狀態</span>
                {(() => {
                  const { color, text } = resolveStatus(selectedOrder.status);
                  return <Tag color={color}>{text}</Tag>;
                })()}
              </div>
            </div>
            <Divider />
            <List
              dataSource={selectedOrder.items || []}
              locale={{ emptyText: '此訂單沒有商品資料' }}
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
                  item?.title || item?.books?.title || item?.book?.title || '未命名商品';
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
                          <div>單價：{formatCurrency(item?.price)}</div>
                          <div>數量：{quantity}</div>
                        </div>
                      </div>
                    </div>
                  </List.Item>
                );
              }}
            />
          </Space>
        ) : (
          <Empty description="尚未選擇訂單" />
        )}
      </Drawer>
    </div>
  );
};

export default OrderHistory;
