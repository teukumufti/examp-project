import { login } from '@/service/auth';

// this example how to call api in page
const Login = async () => {
  const response = await login({
    email: 'eample@gmail.com',
    password: 'syalalalal',
  });
};

export default function Home() {
  return (
    <>
      <h6 className="text-red-700">page example</h6>
    </>
  );
}
