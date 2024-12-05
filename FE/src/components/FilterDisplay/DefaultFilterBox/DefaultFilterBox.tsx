interface DefaultFilterBoxProps {
    filterType: string;
    onClick: () => void;
}

const DefaultFilterBox = ({filterType, onClick}: DefaultFilterBoxProps) => {
  return (
    <div>DefaultFilterBox</div>
  )
}

export default DefaultFilterBox