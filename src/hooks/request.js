import { ref } from 'vue';
import useLoading from './loading';

// use to fetch list
// Don't use async function. It doesn't work in async function.
// Use the bind function to add parameters
// example: useRequest(api.bind(null, {}))

export default function useRequest(api, defaultValue, isLoading = true) {
  const { loading, setLoading } = useLoading(isLoading);
  const response = ref(defaultValue);
  api()
    .then((res) => {
      response.value = res.data;
    })
    .finally(() => {
      setLoading(false);
    });
  return { loading, response };
}
