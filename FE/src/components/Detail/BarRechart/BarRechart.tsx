import { Bar, BarChart, CartesianGrid, Legend, Rectangle, Tooltip, XAxis, YAxis } from "recharts";
import styled from "styled-components";

import { BarLoanGroup } from "@/types/bookDetailType";
interface BarRechartProps {
    chartName: string;
    data: BarLoanGroup[];
    XDataKey: string;
}
const BarRechart = ({
    chartName,
    data,
    XDataKey,
}: BarRechartProps) => {
    
    return (
        <div>
            <ChartName>{chartName}</ChartName>
            <Card>
                <ScrollWrap>
                    <BarChart
                        width={1024}
                        height={300}
                        data={data}
                        margin={{ top: 5, right: 30, bottom: 5, left: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey={XDataKey}/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="대출건수" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                        <Bar dataKey="순위" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                    </BarChart>
                </ScrollWrap>
            </Card>
        </div>
    );
};

export default BarRechart;

const Card = styled.div`
    padding-top: 10px;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ScrollWrap = styled.div`
    width: 100%;
    overflow-x: auto;
    overflow-y: none;
    background: white;
    -webkit-overflow-scrolling: touch;
`;

const ChartName = styled.div`
    padding: 12px;
    font-size: 1.5rem;
    font-weight: bold;
`;
