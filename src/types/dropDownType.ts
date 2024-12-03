export type Value = "keyword" | "author" | "publisher"
export type Label = "제목" | "저자" | "출판사"

export interface DropDownItemType {
    value: Value;
    label: Label;
}