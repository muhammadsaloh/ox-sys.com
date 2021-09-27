import React from "react";
import { Card, Row, Col } from "antd";
import LoginForm from "./LoginForm"


const Login = () => {
	return (
		<div className="h-100">
			<div className="container d-flex flex-column justify-content-center h-100">
				<Row justify="center">
					<Col xs={20} sm={20} md={20} lg={10}>
						<Card className="mt-5">
							<div className="my-4">
								<div className="text-center">
									<h1>Login</h1>
								</div>
								<Row justify="center">
									<Col xs={24} sm={24} md={20} lg={20}>
										<LoginForm />
									</Col>
								</Row>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Login