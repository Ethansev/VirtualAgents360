type Props = {
    firstName: string;
};
export default function EmailTemplate(props: Props) {
    const { firstName } = props;
    return (
        <div>
            <h1>ayoo hi {firstName}</h1>
        </div>
    );
}
