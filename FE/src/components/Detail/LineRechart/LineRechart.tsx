import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import styled from "styled-components";

interface LineRechartProps {
    chartName: string;
    data: { [key: string]: string | number }[];
    dataKey: string;
    XDataKey: string;
}

const LineRechart = ({
    chartName,
    data,
    dataKey,
    XDataKey,
}: LineRechartProps) => {
    if(!data) return <ChartName>대출 통계가 없어요!</ChartName>
    return (
        <div>
            <ChartName>{chartName}</ChartName>
            <Card>
                <ScrollWrap>
                    <LineChart
                        width={1024}
                        height={300}
                        data={data}
                        margin={{ top: 5, right: 30, bottom: 5, left: 0 }}
                    >
                        <CartesianGrid stroke="#ccc" />
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke="#8884d8"
                        />
                        <XAxis
                            dataKey={XDataKey}
                            interval={0}
                            tick={{ fontSize: "12px" }}
                        />
                        <YAxis tick={{ fontSize: "12px" }} />
                        <Tooltip />
                    </LineChart>
                </ScrollWrap>
            </Card>
        </div>
    );
};

export default LineRechart;

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
