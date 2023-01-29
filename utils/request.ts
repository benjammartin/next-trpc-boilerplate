class FetchError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

interface ResponseData<T> {
  data: T;
  error?: FetchError;
}

async function request<T>(
  url: string,
  params: RequestInit = {}
): Promise<ResponseData<T> | null> {
  try {
    const response = await fetch(url, params);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      data,
    } as ResponseData<T>;
  } catch (error) {
    if (error instanceof FetchError) {
      console.error(
        `Fetch error: ${error.message} (status code: ${error.statusCode})`
      );
    } else {
      console.error(error);
    }
    return null;
  }
}

export default request;
