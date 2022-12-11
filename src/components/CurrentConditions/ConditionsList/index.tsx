import Styles from './styles';
import { dataFormatter } from '../data';

export interface IConditionsListProps {
    data: [string, (string | number)][][];
}

export default function ConditionsList(props: IConditionsListProps): JSX.Element {
    const { data }: IConditionsListProps = props;

    return (
        <>
            {data.map((list, index) => {
                return (
                    <ul className={Styles.conditionList} key={'list:' + index}>
                        {list.map(([key, value]) => {
                            const { formatter, display } = dataFormatter[key as keyof typeof dataFormatter];

                            return (
                                <li className={Styles.conditionListItem} key={key}>
                                    <p className={Styles.condition}>
                                        {/* @ts-ignore */}
                                        {display}: {formatter(value)}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                );
            })}
        </>
    );
}
