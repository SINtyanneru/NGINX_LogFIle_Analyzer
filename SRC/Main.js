/**
 * るみさん㌨Да！
 */

const fs = require('fs');
const filename = process.argv[2];

fs.readFile(filename, (err, data)=>{//ファイルを読み込む
	if(err){
		//エラー
		console.log(err);
		return;
	}

	//ファイルを読み込めたので実行
	Main(data);
});


//メインのコードだにょん(？)
function Main(LOG){
	LOG = LOG.toString();
	const LOG_N_SPLIT = LOG.split("\n");

	let IP_DATA = {};//IPがどれぐらいアクセスしたか

	for (let i = 0; i < LOG_N_SPLIT.length; i++) {
		const LOG_S_SPLIT = LOG_N_SPLIT[i];
		if(LOG_S_SPLIT != "" && LOG_S_SPLIT != undefined){//内容が有るか
			//ある
			const LOG_SPLIT = LOG_S_SPLIT.split(" ");//スペースで区切る
			if(IP_DATA[LOG_SPLIT[0]] != undefined){//一回目かをチェック
				//一回目じゃないからインクリ
				IP_DATA[LOG_SPLIT[0]].COUNT++;
				IP_DATA[LOG_SPLIT[0]].REQUEST.push(
					{
						USER_AGENT:LOG_SPLIT.slice(11).join(" "),
						DATE:LOG_SPLIT[3] + " " + LOG_SPLIT[4],
						TYPE:LOG_SPLIT[5],
						URI:LOG_SPLIT[6],
						METHOD:LOG_SPLIT[7]
					}
				);
			}else{
				//一回目なので1をセット
				IP_DATA[LOG_SPLIT[0]] = {
					COUNT:1,
					REQUEST:[
						{
							USER_AGENT:LOG_SPLIT.slice(11).join(" "),
							DATE:LOG_SPLIT[3] + " " + LOG_SPLIT[4],
							TYPE:LOG_SPLIT[5],
							URI:LOG_SPLIT[6],
							METHOD:LOG_SPLIT[7]
						}
					]
				};
			}
		}
	}

	let TEXT_LENGTH = 0;
	for (let i = 0; i < Object.keys(IP_DATA).length; i++){
		const DATA = IP_DATA[Object.keys(IP_DATA)[i]];
		const KEY_NAME = Object.keys(IP_DATA)[i];

		const TEXT = ("[" + DATA.COUNT + "]" + KEY_NAME);

		if(TEXT_LENGTH < TEXT.length){
			TEXT_LENGTH = TEXT.length;
		}
	}

	console.log("┌" + ("─".repeat((TEXT_LENGTH - "[LOG VIEW]".length) / 2)) + "[LOG VIEW]" + ("─".repeat((TEXT_LENGTH - "[LOG VIEW]".length) / 2)) + "┐");
	for (let i = 0; i < Object.keys(IP_DATA).length; i++){
		const DATA = IP_DATA[Object.keys(IP_DATA)[i]];
		const KEY_NAME = Object.keys(IP_DATA)[i];
		if(i === 0){
			console.log("│" + (" ".repeat((TEXT_LENGTH - 1))) + "│");
		}

		const TEXT = "[" + DATA.COUNT + "]" + KEY_NAME;

		console.log(TEXT + (" ".repeat((TEXT_LENGTH - TEXT.length))) + "│");

		if(i === Object.keys(IP_DATA).length - 1){
			console.log("│" + (" ".repeat((TEXT_LENGTH - 1))) + "│");
			console.log("└" + ("─".repeat((TEXT_LENGTH - "[END]".length - 1) / 2)) + "[END]" + ("─".repeat((TEXT_LENGTH - "[END]".length) / 2)) + "┘");
		}
	}
}