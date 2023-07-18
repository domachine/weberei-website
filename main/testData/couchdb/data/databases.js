export default {
  _users: {
    all: {
      total_rows: 2,
      offset: 0,
      rows: [
        {
          id: '_design/_auth',
          key: '_design/_auth',
          value: { rev: '1-753ae0157a8b1a22339f3c0ef4f1bf19' },
        },
        {
          id: 'org.couchdb.user:testdevice',
          key: 'org.couchdb.user:testdevice',
          value: { rev: '1-32e2fafcd4a6689c0f7bf9756c5db416' },
        },
      ],
    },
  },
  userdbs: [{ name: 'userdb-testdevice', docs: { all: [] } }],
}
