export const baseUrl = "http://localhost:5000/api";
// export const baseUrl = "https://snapshare-1-ur7p.onrender.com/api";

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  console.log(response);
  const data = await response.json();
  if (!response.ok) {
    return { error: true, message: data };
  }
  return data;
};

export const getRequest = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    let message = "An error occurred...";
    if (data?.message) {
      message = data.message;
    }
    return { error: true, message };
  }
  return data;
};
