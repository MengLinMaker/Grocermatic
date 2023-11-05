import { ActionButton } from '../../components/ActionButton'
import { For, Show, splitProps } from 'solid-js'
import { CheckCircleIcon } from '../../svg/CheckCircleIcon'
import { PlusCircleIcon } from '../../svg/PlusCircleIcon'
import { StoreLogo } from '../../svg/StoreLogo'

export const StoreSelection = (props: any) => {
  const [local, _] = splitProps(props, ['stores', 'setStores'])

  const storeOnClick = (id: number) => {
    let tempStore = JSON.parse(JSON.stringify(local.stores))
    tempStore[id].active = !local.stores[id].active
    local.setStores(tempStore)
  }

  return (
    <>
      <div class="flex gap-2 overflow-x-auto no-scrollbar">
        <For each={local.stores}>
          {(store, i) => (
            <ActionButton
              onClick={() => storeOnClick(i())}
              class={`card relative gap-2 flex flex-col flex-grow flex-shrink-0 items-center w-40 p-4 ${
                store.active ? 'fill-light bg-dark' : 'fill-shade'
              }`}
            >
              <StoreLogo storeName={store.name} class="h-5" />
              <p class={`font-bold text-xs ${store.active ? 'text-light' : 'text-shade'}`}>
                {store.name}
              </p>
              <Show
                when={store.active}
                fallback={<PlusCircleIcon class="absolute h-4 top-3 left-3" />}
              >
                <CheckCircleIcon class="absolute h-4 top-3 left-3" />
              </Show>
            </ActionButton>
          )}
        </For>
      </div>
    </>
  )
}
