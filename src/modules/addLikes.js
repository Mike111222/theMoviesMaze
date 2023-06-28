const addLike = async (itemId) => {
  try {
    const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4GPf219m22AmrD3G654e/likes';
    const requestBody = {
      item_id: itemId,
    };
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
  } catch (error) {
    // Handle the error if needed
  }
};

export default addLike;
