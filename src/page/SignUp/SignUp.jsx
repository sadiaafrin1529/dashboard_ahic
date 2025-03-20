import { FacebookFilled, GoogleSquareFilled, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCrateUsersMutation } from '../../Redux/Features/Auth/AuthApi';

function SignUp() {
  const navigate = useNavigate(); // Initialize navigation hook
  const [addNewData, { isLoading, isError, data }] = useCrateUsersMutation();

  const onFinish = async (values) => {
    if (values.password !== values.confirm) {
      toast.error('Passwords do not match!');
      return;
    }

    const info = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    try {
      const response = await addNewData(info).unwrap(); // Unwrap to handle API response
      console.log(response);
      if (response) {
        toast.success(response.message);
        navigate("/login"); // Navigate to login page
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
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
          <h2 className="text-4xl font-bold mb-4 font-mono">Join Us</h2>
          <p className="text-xl text-center font-mono">
            Create an account and explore endless possibilities
          </p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 font-mono">
            Sign Up
          </h1>

          <Form name="register" className="signup-form" onFinish={onFinish}>
            {/* User Name */}
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input your User Name!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="User Name"
                size="large"
                className="rounded-lg p-3"
              />
            </Form.Item>

            {/* Email */}
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email", message: "Please enter a valid Email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                size="large"
                className="rounded-lg p-3"
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
                className="rounded-lg p-3"
              />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your Password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
                size="large"
                className="rounded-lg p-3"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-10 rounded-lg bg-blue-600 hover:bg-blue-700"
                loading={isLoading} // Show loading indicator
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center text-gray-600 mb-6">Or sign up with</div>

          <div className="flex justify-center space-x-4">
            <Button
              className="h-8 w-12 rounded-full bg-blue-800 hover:bg-blue-900 text-white"
              icon={<FacebookFilled />}
            />
            <Button
              className="h-8 w-12 rounded-full bg-red-600 hover:bg-red-700 text-white"
              icon={<GoogleSquareFilled />}
            />
          </div>

          <div className="mt-8 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
