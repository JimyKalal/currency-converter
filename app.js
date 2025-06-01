import https from 'https';
import readline from 'readline';
// import chalk from 'chalk';

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
const apiKey = "a914c1b57fe637ec6cef4b51";
const url = `https:v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const convertCurrency=(amount , rate)=>{
    return (amount * rate).toFixed(2);
}

https.get(url,(res)=>{
     let data = "";
    res.on('data',(chunk)=>{
        data += chunk ;
    });
    res.on('end',()=>{
        const rates = JSON.parse(data).conversion_rates;

        rl.question('Enter the amount in USD: ',(amount)=>{
            rl.question('Enter the target currency (e.g., INR, EUR, NPR):' ,(currency)=>{
                // const rate = rates[currency.toUpperCase()];
                   const rate =   rates.currency.toUpperCase();
                if(rate){
                    console.log(`${amount} USD is approximately ${convertCurrency(amount, rate)} ${currency}`);
                    
                }else{
                    console.log("Invalid Currency");
                }
                rl.close();
            })
        })
    });

})
