import React from "react";
import { Button, Table, Card, Input, Space } from "antd";


const AuthenticatedApp = () => {
	const [data, setData] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const user = window.localStorage.getItem("__token__");


	const handleLogout = () => {
		window.localStorage.removeItem("__token__");
		window.location.assign(window.location);
	};

	const [page, setPage] = React.useState(1);
	const [size, setSize] = React.useState(10);

	React.useEffect(() => {
		fetchDatas();
	}, [user]);

	async function fetchDatas() {
		const token = window.localStorage.getItem("__token__");
		const url = "https://face.ox-sys.com/variations";
		const headers = {
			"Content-Type": "application/json; charset=UTF-8",
			Authorization: `Bearer ${token}`,
		};
		const details = JSON.stringify({
			size: 286,
			page: 1,
			stock: {
				exist: true,
				location: [42],
			},
		});
		setIsLoading(true);
		const response = await fetch(url, {
			method: "POST",
			headers,
			body: details,
		});
		const json = await response.json();
		setData(json);
		setIsLoading(false);
	}


	const columns = [
		{
			title: "Product",
			dataIndex: "productName",
			key: "productName",
			render: (_, product) => <>{product?.importRecord?.productName}</>,
		},
	];

	const onShowSizeChange = (currentPage, pageSize) => {
		setSize(pageSize);
	};

	return (
		<>
			<Card>
				<Button className="mb-3" onClick={() => handleLogout()}>Log Out</Button>
				<Table
					rowKey={"id"}
					loading={isLoading}
					dataSource={data?.items}
					columns={columns}
					bordered
					showSizeChanger
					pagination={{
						current: page,
						onShowSizeChange,
						onChange: (page) => {
							window.scrollTo({ top: 0, behavior: "smooth" });
							setPage(page);
						},
					}}
				/>
			</Card>
		</>
	);
};

export default AuthenticatedApp;

