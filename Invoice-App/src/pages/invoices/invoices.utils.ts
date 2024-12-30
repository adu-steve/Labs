const stringToBoolean = (str: string) => str === "true";

export const extractQueryStringValues = (url: URLSearchParams) => {
  const draft = stringToBoolean(url.get("draft") || "false");
  const pending = stringToBoolean(url.get("pending") || "false");
  const paid = stringToBoolean(url.get("paid") || "false");

  return { draft, pending, paid };
};
