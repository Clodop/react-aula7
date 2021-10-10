export const loadPosts = async () => {
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const [posts] = await Promise.all([postResponse]);
    const postsJson = await posts.json();

    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
    const [photos] = await Promise.all([photosResponse]);
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url}
    })

    return postsAndPhotos;    
}