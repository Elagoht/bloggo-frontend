import { Component, createMemo, Show } from "solid-js";
import Text from "../../../utilities/Text";

type AvatarImageProps = Partial<Pick<ResponseUser, "avatar">> &
  Pick<ResponseUser, "name">;

const AvatarImage: Component<AvatarImageProps> = (props) => {
  const initials = Text.getInitialLetters(props.name);

  return (
    <Show
      when={props.avatar}
      fallback={
        <div class="mx-auto mb-2 text-8xl font-medium bg-gopher-500 rounded-full size-48 grid place-items-center">
          {initials}
        </div>
      }
    >
      <img
        src={import.meta.env.VITE_API_URL + props.avatar}
        alt={initials}
        width={192}
        height={192}
        class="mx-auto mb-2 place-items-center grid text-center overflow-hidden object-cover object-center rounded-full text-8xl font-medium from-gopher-700 to-gopher-300 bg-gradient-to-tl size-48"
      />
    </Show>
  );
};

export default AvatarImage;
