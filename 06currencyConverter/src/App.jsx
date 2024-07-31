import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'


function App() {

    // to handle the amount I input in form box
    const [amount, setAmount] = useState(0)
    // To handle currency type of form box
    const [from, setFrom] = useState("usd")
    // To handle currency type of to box
    const [to, setTo] = useState("bdt")
    // To handle the converted anount value
    const [convertedAmount, setConvertedAmount] = useState(0)

    // Get the object of converting currencies
    const currencyInfo = useCurrencyInfo(from)
    const options = Object.keys(currencyInfo)

    const swap = () => {
        setFrom(to)
        setTo(from)
        setConvertedAmount(amount)
        setAmount(convertedAmount)
    }

    const convert = () => {
        setConvertedAmount(amount * currencyInfo[to])
    }

    return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/403/467/730/technology-bitcoin-coin-money-wallpaper-preview.jpg')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                // Form of whole currency conversion
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()

                    }}
                >
                    // Card of currency where I give input to convert
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            curencyOptions={options}  // Option for selecting currency 
                            onCurrencyChange={(currency) => setAmount(amount)}
                            selectCurrency={from}
                            onAmountChange={(amount) => 
                                setAmount(amount)}

                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        // Swap Button which will swap value and currency of two boxes
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}

                        >
                            swap
                        </button>
                    </div>
                    // Box of output currency which i want to know
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            curencyOptions={options}
                            onCurrencyChange={(currency) => 
                                setTo(currency)}
                            selectCurrency={to}
                            amountDisable

                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default App
