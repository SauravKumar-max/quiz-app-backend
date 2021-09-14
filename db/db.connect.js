const mongoose = require('mongoose');

async function initializeDBConnection(){

const mySecret = process.env['DB_PASSWORD']

	try{
		const uri = `mongodb+srv://db${mySecret}@cluster0.iha7u.mongodb.net/quiz-app?retryWrites=true&w=majority`;

		await mongoose.connect(uri, { 
			useUnifiedTopology: true ,
			useNewUrlParser: true,
			useFindAndModify: false
  	})

		console.log("Connection Completed");
	}catch(error){
		console.log("Failed to connect" ,error);
	}
}


module.exports = { initializeDBConnection };