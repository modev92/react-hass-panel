const hassMedia = (url: string) => {
  if (process.env.NODE_ENV === 'production') {
    return `/local/react-panel-live/${url}`;
  }

  return `http://localhost:3000/${url}`;
};

export default hassMedia;
