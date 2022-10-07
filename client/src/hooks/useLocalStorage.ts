
const useLocalStorage = () => {
  const loggedUserJSON: any = localStorage.getItem('auth');
  const token = JSON.parse(loggedUserJSON);

  return [token]
}
export default useLocalStorage;
