const queryTwitterResolver = {
  currentUser: () => {
    return {
      id: '123',
      name: 'John Doe',
      handle: 'johndoe',
      coverUrl: '',
      avatarUrl: '',
      createdAt: '',
      updatedAt: '',
    };
  },
  suggestions: () => {
    return [];
  },
};

export default queryTwitterResolver;
