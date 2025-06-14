import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { Spacing } from "@components/Common";
import FilterDisplay from "@components/FilterDisplay/FilterDisplay";
import { BaseButton } from "@components/ui";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import twc from "tailwind-styled-components";

import useBookStore from "@/stores/bookStore";

import DropDownBox from "../DropDownBox/DropDownBox";

const HeaderInput = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { searchText, setSearchText } = useBookStore();
  const [inputValue, setInputValue] = useState(searchText);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchText(inputValue);
    if (location.pathname !== "/") navigate("/");
    setOpen(false);
  };

  useEffect(() => {
    setInputValue(searchText);
  }, [searchText]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Container>
        <Dialog.Trigger asChild>
          <SearchIcon />
        </Dialog.Trigger>

        <Dialog.Portal>
          <Overlay />
          <CardContent>
            <Dialog.Title className="sr-only">검색창</Dialog.Title>
            <Dialog.Close asChild>
              <CloseBtn />
            </Dialog.Close>

            <InputWrap onSubmit={handleSubmit}>
              <Wrap>
                <DropDownBox />
                <StyledInput
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="검색어 입력"
                />
              </Wrap>

              <Spacing height="sm" />

              <BaseButton
                width="full"
                color="primary"
                fontColor="white"
                fontSize="sm"
                height="md"
                type="submit"
              >
                검색하기
              </BaseButton>
            </InputWrap>

            <FilterWrap>
              <Spacing height="md" />
              <FilterDisplay />
            </FilterWrap>
          </CardContent>
        </Dialog.Portal>
      </Container>
    </Dialog.Root>
  );
};

export default HeaderInput;

const Container = twc.div`
  relative
`;

const SearchIcon = twc(SearchOutlined)`
  text-xl cursor-pointer
`;

const Overlay = twc(Dialog.Overlay)`
  fixed inset-0 bg-black/30 z-[999]
`;

const CardContent = twc(Dialog.Content)`
  fixed top-24 right-4 w-[250px] max-h-[460px] bg-white rounded-lg border border-gray-300
  p-8 shadow-xl z-[1000] overflow-y-auto animate-fadeIn
`;

const CloseBtn = twc(CloseOutlined)`
  absolute top-2 right-2 cursor-pointer
`;

const InputWrap = twc.form`
  w-full
`;

const StyledInput = twc.input`
  w-full text-center px-2 py-1 text-base border-b border-blue-500 outline-none
`;

const Wrap = twc.div`
  flex gap-2 mb-4
`;

const FilterWrap = twc.div`
  block md:hidden
`;
