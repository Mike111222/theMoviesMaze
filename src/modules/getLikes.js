const getLikes = async () => {
  try {
    const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4GPf219m22AmrD3G654e/likes';
    const response = await fetch(url);
    const likesData = await response.json();
    return likesData;
  } catch (error) {
    // Handle the error if needed
    return [];
  }
};

export default getLikes;
