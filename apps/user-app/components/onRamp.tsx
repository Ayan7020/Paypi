import Card from "@repo/ui/Usercard"

interface onRampProps {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string 
    }[] 
}

export default function onRampTransactions({
    transactions
}: onRampProps) {

    if(!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
    <div className="pt-2">
        {transactions.map(t => <div className="flex justify-between border-b-2 border-slate-200 p-2">
            <div>
                <div className="text-sm">
                    Received INR
                </div>
                <div className="text-slate-600 text-xs flex gap-3">
                    <div>
                    {t.time.toDateString()} 
                    </div>
                    <div className="text-red-500">  
                    {t.status}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center">
                + Rs {t.amount / 100}
            </div>

        </div>)}
    </div>
</Card>
}