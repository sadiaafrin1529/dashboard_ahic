import { FacebookFilled, GoogleSquareFilled, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useLoginUsersMutation } from '../../Redux/Features/Auth/AuthApi';
import { toast } from 'sonner';
import DecodeToken from '../../utils/DecodeToken/DecodeToken';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Features/Auth/UserSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [loginData,{isLoading,isError}] = useLoginUsersMutation()
  const onFinish = async(values) => {
    const res = await loginData(values)
    console.log(res?.data?.success)
    if(res?.data?.success){
      toast.success(res?.data?.message)
      const userToken  =  res.data?.data
      const userInfo = await DecodeToken(res?.data?.data) 
      dispatch(login({user:userInfo,token:userToken}))
      navigate('/');
    }
    else {
      toast.error(res?.error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side Image */}
      <div
        className="hidden md:flex md:w-1/2 bg-gray-900 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://cdni.iconscout.com/illustration/premium/thumb/login-access-illustration-download-in-svg-png-gif-file-formats--authentication-secure-denied-web-development-pack-design-illustrations-8266114.png?f=webp)",
        }}
      >
        <div className="w-full h-full flex flex-col justify-center items-center text-white bg-black bg-opacity-40 p-8">
          <h2 className="text-4xl font-bold mb-4 font-mono">Welcome Back</h2>
          <p className="text-xl text-center font-mono">
            Connect with us and manage your account seamlessly
          </p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 font-mono">
            Sign In
          </h1>

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                size="large"
                className="rounded-lg p-3"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                size="large"
                className="rounded-lg p-3"
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="text-gray-600">Remember me</Checkbox>
              </Form.Item>
              <a
                className="float-right text-blue-600 hover:text-blue-800"
                href="#"
              >
                Forgot password?
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-10 rounded-lg bg-blue-600 hover:bg-blue-700"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center text-gray-600 mb-6">Or login with</div>

          <div className="flex justify-center space-x-4">
            <Button
              className="flex items-center justify-center h-8 w-12 rounded-full bg-blue-800 hover:bg-blue-900 text-white"
              icon={<FacebookFilled className="text-xl" />}
            />
            <Button
              className="flex items-center justify-center h-8 w-12 rounded-full bg-red-600 hover:bg-red-700 text-white"
              icon={<GoogleSquareFilled className="text-xl" />}
            />
          </div>

          <div className="mt-8 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
