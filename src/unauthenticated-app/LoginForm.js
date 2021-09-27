import React from "react";
import { Button, Form, Input, Alert } from "antd";
import {
	LoginOutlined,
	LockOutlined,
	RadarChartOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const LoginForm = () => {
	const [data, setData] = React.useState(null);
	const [loading, setLoading] = React.useState(false);

	const onFinish = async (values) => {
		const url = `https://${values._subdomain}.ox-sys.com/security/auth_check`;
		const headers = {
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		};
		const details = {
			_username: values._username,
			_password: values._password,
			_subdomain: values._subdomain,
		};
		let formBody = [];
		for (let property in details) {
			let encodedKey = encodeURIComponent(property);
			let encodedValue = encodeURIComponent(details[property]);
			formBody.push(encodedKey + "=" + encodedValue);
		}
		formBody = formBody.join("&");
		setLoading(true);
		const response = await fetch(url, {
			method: "POST",
			headers,
			body: formBody,
		});

		const json = await response.json();
		setData(json);
		setLoading(false);
    window.localStorage.setItem("__token__", json.token)
    window.location.assign(window.location);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<motion.div
				initial={{ opacity: 0, marginBottom: 0 }}
				animate={{
					opacity: data?.message ? 1 : 0,
					marginBottom: data?.message ? 20 : 0,
				}}
			>
				<Alert type="error" showIcon message={data?.message}></Alert>
			</motion.div>
			<Form
				name="basic"
				labelCol={{
					span: 8,
				}}
				wrapperCol={{
					span: 16,
				}}
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Username"
					name="_username"
					rules={[
						{
							required: true,
							message: "Please input your username!",
						},
					]}
				>
					<Input
						minLength={3}
						prefix={<LoginOutlined className="text-primary" />}
					/>
				</Form.Item>

				<Form.Item
					label="Password"
					name="_password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
				>
					<Input.Password
						minLength={8}
						prefix={<LockOutlined className="text-primary" />}
					/>
				</Form.Item>

				<Form.Item
					name="_subdomain"
					label="Subdomain"
					rules={[
						{
							required: true,
							message: "Please, enter your subdomain!",
						},
					]}
				>
					<Input minLength={3}
            prefix={<RadarChartOutlined className="text-primary" />}
          />
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type="primary" htmlType="submit" loading={loading}>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default LoginForm;
