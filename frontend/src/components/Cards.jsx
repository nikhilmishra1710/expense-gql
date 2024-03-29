import { useQuery } from "@apollo/client";
import Card from "./Card";

import { GET_TRANSACTIONS } from "../graphql/queries/transactionQuery";
import { GET_AUTHENTICATED_USER, GET_USER_AND_TRANSACTIONS } from "../graphql/queries/userQuery";

const Cards = () => {
    const { data, loading, error } = useQuery(GET_TRANSACTIONS);
    const { data: dataAuthUser } = useQuery(GET_AUTHENTICATED_USER);
    const { data: userDataTransactions } = useQuery(GET_USER_AND_TRANSACTIONS, { variables: { userId: dataAuthUser?.authUser._id } });

    console.log("data:", data, "dataAuthUser:", dataAuthUser?.authUser._id, "userDataTransactions:", userDataTransactions);
    return (
        <div className="w-full px-10 min-h-[40vh]">
            <p className="text-5xl font-bold text-center my-10">History</p>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
                {loading && <p>Loading...</p>}
                {error && <p>Error fetching transactions</p>}
                {data && data.getTransactions.map((transaction) => <Card key={transaction._id} transaction={transaction} />)}
            </div>
        </div>
    );
};
export default Cards;
