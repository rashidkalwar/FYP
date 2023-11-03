const columns = [
  { name: 'TITLE', uid: 'title', sortable: true },
  { name: 'DESCRIPTION', uid: 'description' },
  { name: 'DATE CREATED', uid: 'createdAt', sortable: true },
  { name: 'DATE UPDATED', uid: 'updatedAt', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];

const datasets = [
  {
    _id: '653e126e408fe06adc803755',
    title: 'This is new 2 dataset',
    description: 'This is new 2 dataset',
    createdAt: '2023-10-29',
    updatedAt: '2023-10-29',
    slug: 'this-is-new-2-dataset',
  },
  {
    _id: '653e5850cda1f6cfc2034b9e',
    title: 'Hello I am dataset number 1',
    description: 'Hello I am dataset number 1',
    createdAt: '2023-10-28',
    updatedAt: '2023-10-29',
    slug: 'hello-i-am-dataset-number-1',
  },
];

export { columns, datasets };
