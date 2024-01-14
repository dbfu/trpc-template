import { Button, Input, Space, Table, message } from 'antd';
import { useState } from 'react';
import { trpc } from '../../utils/trpc';
import NewAndEditForm from './newAndEditForm';

function UserPage() {
  const [value, setValue] = useState<string>();
  const [tablePagination, setTablePagination] = useState({
    current: 1,
    pageSize: 10
  });
  const [open, setOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<{ id: number, name: string, email: string } | null>();

  const { isLoading, data, refetch } = trpc.user.page.useQuery({
    name: value,
    limit: tablePagination.pageSize,
    page: tablePagination.current,
  });

  const { mutate } = trpc.user.remove.useMutation({
    onSuccess: () => {
      message.success('操作成功');
      refetch();
    }
  });

  const [columns] = useState([{
    dataIndex: 'id',
    title: 'id',
  }, {
    dataIndex: 'name',
    title: 'name',
  }, {
    dataIndex: 'email',
    title: 'email',
  },
  {
    dataIndex: 'id',
    title: '操作',
    render: (id: number, record: any) => (
      <Space>
        <Button
          type='link'
          onClick={() => {
            setOpen(true);
            setEditRecord(record);
          }}
        >
          编辑
        </Button>
        <Button
          type='link'
          danger
          onClick={() => {
            mutate({ id });
          }}
        >
          删除
        </Button>
      </Space>
    )
  }]);

  const search = (value: string) => {
    setValue(value);
  }

  const tableChange = (pagination: any) => {
    setTablePagination(pagination);
  }

  return (
    <Space
      direction="vertical"
      style={{ width: '100%', padding: '40px 20px', boxSizing: 'border-box' }}
      size="large"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type='primary' onClick={() => setOpen(true)}>新建</Button>
        <Input.Search enterButton onSearch={search} style={{ width: 400 }} />
      </div>
      <Table
        rowKey="id"
        columns={columns}
        loading={isLoading}
        dataSource={data?.users}
        onChange={tableChange}
        pagination={{
          ...tablePagination,
          total: data?.pageInfo.totalCount,
        }}
        size='small'
      />
      <NewAndEditForm
        open={open}
        onClose={() => {
          setOpen(false);
          setEditRecord(null);
        }}
        onSuccess={() => {
          refetch();
        }}
        editRecord={editRecord}
      />
    </Space>
  )
}

export default UserPage;
