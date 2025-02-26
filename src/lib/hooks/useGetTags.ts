import useSWR from 'swr';

const useGetTags = function() {
  return useSWR(
    'tags.list',
    async () => {
      const response = await fetch('/api/tags');
      return response.json();
    })
}

export default useGetTags;
