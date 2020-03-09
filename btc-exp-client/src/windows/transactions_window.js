import React from "react";
import { Box, Text, DataTable, TextInput } from "grommet";
import axios from "axios";
import EllipsisText from "react-ellipsis-text";
import moment from "moment";
import { Ascend, Search, Services } from "grommet-icons";
import TransactionInfo from "../components/transaction_info.js";
import TextInfo from "../components/text_info.js";
import Loading from "../components/loading.js";

class TransactionsWindow extends React.Component {
	state = {
		transactions: [],
		focusTx: undefined,
		focusRaw: undefined,
		blockHeight: undefined
	};

	constructor(props) {
		super(props);

		this.infoWindow = React.createRef();

		this.textWindow = React.createRef();
	}

	componentDidMount() {
		this.fetch();
	}

	/** 
	* Gets transactions from the block specified 
	*/
	async fetch() {
		try {
			const response = await axios.get(
				"http://localhost:8080/transactions/new",
				{
					params: {
						height: this.state.blockHeight
					}
				}
			);

			if (response.status !== 200) return;

			this.setState({ transactions: response.data });
		} catch (err) {
			console.log(err);
		}
	}

	/**
	* Gets raw transaction from hash.
	*/
	async searchRaw() {
		try {
			const response = await axios.get(
				"http://localhost:8080/transactions/raw",
				{
					params: {
						hash: this.state.queryRaw
					}
				}
			);

			if (response.status !== 200) return;

			this.setState({ focusRaw: response.data });

			this.textWindow.current.setRender();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	* Gets the transaction from raw string
	*/
	async searchDecoded() {
		try {

			/* Decode raw string */
			const response = await axios.get(
				"http://localhost:8080/transactions/decode",
				{
					params: {
						raw: this.state.queryTx
					}
				}
			);

			if (response.status !== 200) return;

			/* Get transaction from hash */
			const second_response = await axios.get(
				"http://localhost:8080/transactions",
				{
					params: {
						hash: response.data.hash
					}
				}
			);

			if (second_response.status !== 200) return;

			this.setState({
				focusTx: { ...response.data, ...second_response.data }
			});

			/* Render results */
			this.infoWindow.current.setRender();
		} catch (err) {
			console.log(err);
		}
	}

	/**
	* Time elapsed from transaction's creation
	*
	* @param  {number} timestamp Creation timestamp.
	* @return {string} 			 Elapsed.
	*/
	calculateElapsed(timestamp) {
		return moment.unix(timestamp).fromNow();
	}

	/**
	* Render transaction info 
	*
	* @param {object} focusTx Transaction object.
	*/
	renderBlockInfo(focusTx) {
		this.setState({ focusTx });

		this.infoWindow.current.setRender();
	}

	render() {
		if (this.state.transactions.length < 1) return <Loading />;

		return (
			<Box pad="medium" width="100%" animation="fadeIn">
				<Box
					round="medium"
					elevation="medium"
					background="white"
					pad="xsmall"
					height="fit-content"
					direction="row"
				>
					<TextInput
						placeholder="Block Height"
						value={this.state.blockHeight}
						onChange={e =>
							this.setState({ blockHeight: e.target.value })
						}
					/>
					<Box
						round="medium"
						className="hor-gradient"
						pad="small"
						align="center"
						onClick={this.fetch.bind(this)}
					>
						<Search size="medium" color="white" />
					</Box>
				</Box>
				<Box direction="row" width="100%" gap="medium">
					<Box
						background="white"
						round="medium"
						elevation="medium"
						margin={{ top: "medium" }}
						pad="small"
						overflow="scroll"
						style={{ maxHeight: "79vh" }}
					>
						<DataTable
							columns={[
								{
									property: "index",
									header: (
										<Text className="heavy" color="#6e72e6">
											Index
										</Text>
									),
									primary: true,
									render: datum => (
										<Text color="#68707f">
											{datum.index}
										</Text>
									)
								},
								{
									property: "hash",
									header: (
										<Text className="heavy" color="#6e72e6">
											Hash
										</Text>
									),
									render: datum => (
										<Box
											pad={{ vertical: "xsmall" }}
											className="info-row"
										>
											<EllipsisText
												text={datum.hash}
												length={"30"}
											/>
										</Box>
									)
								},
								{
									property: "time",
									header: (
										<Text className="heavy" color="#6e72e6">
											Time
										</Text>
									),
									render: datum => (
										<Box
											pad={{ vertical: "xsmall" }}
											className="info-row"
										>
											<Text>
												{this.calculateElapsed(
													datum.time
												)}
											</Text>
										</Box>
									)
								},
								{
									property: "fee",
									header: (
										<Text className="heavy" color="#6e72e6">
											Fee
										</Text>
									),
									render: datum => (
										<Box
											pad={{ vertical: "xsmall" }}
											className="info-row"
										>
											<Text textAlign="end">
												{datum.fee}
											</Text>
										</Box>
									)
								},
								{
									property: "height",
									header: "",
									render: datum => (
										<Box
											pad="small"
											className="hor-gradient"
											width="3vw"
											round="medium"
											elevation="medium"
											align="center"
											onClick={this.renderBlockInfo.bind(
												this,
												datum
											)}
										>
											<Ascend
												color="white"
												size="1.3vw"
											/>
										</Box>
									)
								}
							]}
							data={this.state.transactions}
						/>
					</Box>
					<Box
						direction="column"
						gap="medium"
						margin={{ top: "medium" }}
					>
						<Box
							round="medium"
							elevation="medium"
							background="white"
							pad="small"
							height="fit-content"
						>
							<TextInput
								placeholder="Tx Hash"
								value={this.state.queryRaw}
								onChange={e =>
									this.setState({ queryRaw: e.target.value })
								}
							/>
							<Box
								round="medium"
								className="hor-gradient"
								pad={{ vertical: "small" }}
								align="center"
								onClick={this.searchRaw.bind(this)}
							>
								<Search size="medium" color="white" />
							</Box>
						</Box>
						<Box
							round="medium"
							elevation="medium"
							background="white"
							pad="small"
							height="fit-content"
						>
							<TextInput
								placeholder="Raw Tx"
								value={this.state.queryTx}
								onChange={e =>
									this.setState({ queryTx: e.target.value })
								}
							/>
							<Box
								round="medium"
								className="hor-gradient"
								pad={{ vertical: "small" }}
								align="center"
								onClick={this.searchDecoded.bind(this)}
							>
								<Services size="medium" color="white" />
							</Box>
						</Box>
					</Box>
				</Box>
				<TransactionInfo
					block={this.state.focusTx}
					ref={this.infoWindow}
				/>
				<TextInfo info={this.state.focusRaw} ref={this.textWindow} />
			</Box>
		);
	}
}

export default TransactionsWindow;
