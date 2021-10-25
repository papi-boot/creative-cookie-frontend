export const useFetch = async (
  params,
  httpMethod,
  route,
  setGlobalMessage,
  notify
) => {
  try {
    let prefixPath =
      process.env.NODE_ENV === "production"
        ? "https://creative-cookie.herokuapp.com"
        : "http://localhost:3030";
    const response = await fetch(`${prefixPath}/${route}`, {
      method: httpMethod,
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: httpMethod !== "GET" ? JSON.stringify(params) : null,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status >= 400) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(
        "Something went wrong. Please check your network/server or try again later."
      );
    }
  } catch (err) {
    console.error(err);
    setGlobalMessage(err.message);
    notify(err.message, "error");
  }
};
