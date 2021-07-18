import React, { useEffect, useRef, useState } from "react";
import "./File.css";
import axios from "axios";
import { Spinner } from "react-bootstrap";

export const File = () => {
	const [myFile, setMyFile] = useState("");
	const [newImg, setNewImg] = useState("");
	const [data, setData] = useState("");
	const buttonRef = useRef();
	const inputRef = useRef();

	console.log("ref=====", buttonRef.current);
	useEffect(() => {
		getImage();
	}, []);
	const handleChange = (e) => {
		console.log("e.target", e.target.files);
		setMyFile(e.target.files[0]);
	};
	const handleChoose = () => {
		inputRef.current.click();
		buttonRef.current.style.background = "#fcfcfc";
	};
	const getImage = () => {
		axios
			.get("https://him-app.herokuapp.com/posts")
			.then((res) => setData(res.data))
			.catch((err) => console.log(err));
		buttonRef.current.style.background = "#fcfcfc";
	};
	const postImage = () => {
		const payload = {
			Image: newImg,
		};
		axios
			.post("https://him-app.herokuapp.com/posts", {
				...payload,
				status: false,
			})
			.then((res) => getImage())
			.catch((err) => console.log(err));
	};
	const handleUpload = () => {
		buttonRef.current.style.background = "skyblue";

		const reader = new FileReader();
		console.log(reader);
		reader.onload = () => {
			if (reader.readyState === 2) {
				setNewImg(reader.result);
			}
		};
		reader.readAsDataURL(myFile);

		postImage();
	};

	return (
		<React.Fragment>
			<input
				style={{ display: "none" }}
				ref={inputRef}
				type="file"
				onChange={handleChange}
			/>
			<button onClick={handleChoose}>Pick The File</button>
			<br />
			<button ref={buttonRef} onClick={() => handleUpload()}>
				Upload
			</button>
			{/* <Spinner animation="grow" /> */}
			{!data ? (
				<Spinner animation="grow" />
			) : (
				<div className="wrapper">
					{data.map((img) => (
						<div className="container">
							<img src={img.Image} alt="" />
						</div>
					))}
				</div>
			)}
		</React.Fragment>
	);
};
