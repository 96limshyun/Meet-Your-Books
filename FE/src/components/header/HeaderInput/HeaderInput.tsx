import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { Spacing } from "@components/Common";
import FilterDisplay from "@components/FilterDisplay/FilterDisplay";
import { Button } from "@components/ui/form/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@components/ui/form/form";
import { Input } from "@components/ui/form/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import twc from "tailwind-styled-components";
import { z } from "zod";

import useBookStore from "@/stores/bookStore";

import DropDownBox from "../DropDownBox/DropDownBox";

const searchFormSchema = z.object({
  keyword: z.string().min(2, "검색어를 2글자 이상 입력해주세요"),
});

type SearchFormType = z.infer<typeof searchFormSchema>;

const HeaderInput = () => {
  const [open, setOpen] = useState(false);
  const { searchText, setSearchText } = useBookStore();
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<SearchFormType>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: { keyword: searchText },
  });

  // 전역 상태 변경 시 input 값 반영
  useEffect(() => {
    form.setValue("keyword", searchText);
  }, [searchText]);

  const onSubmit = (data: SearchFormType) => {
    setSearchText(data.keyword);
    if (location.pathname !== "/") navigate("/");
    setOpen(false);
  };

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

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Wrap>
                  <DropDownBox />
                  <FormField
                    control={form.control}
                    name="keyword"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            placeholder="검색어 입력"
                            {...field}
                            className="text-center"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Wrap>

                <Spacing height="sm" />
                <Button type="submit" className="w-full">
                  검색하기
                </Button>
              </form>
            </Form>

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

const Wrap = twc.div`
  flex gap-2 mb-4
`;

const FilterWrap = twc.div`
  block md:hidden
`;