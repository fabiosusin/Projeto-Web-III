(function ($, $sl) {
  const appName = 'listTags';
  $sl.apps.register = $sl.apps.register || {};
  let pb = $sl.apps.register.user = () => {
    main.init();
    main.attachListeners();
  };
  let main = {};
  main.$container = (query) => {
    let $el = $(`[name="${appName}"]`);
    return query ? $el.find(query) : $el;
  };
  main.init = async function () {
    main.plotItems(await main.getItems());
  };
  main.attachListeners = function () {
    const suffix = `.sl.${appName}`;

    main.$container().off(suffix);
    main.$container().on(`click${suffix}`, '[name=addNewButton]', main.onClickOpenAddNewModal);
    main.$container().on(`click${suffix}`, '[name=salvarItem]', main.onClickOpenSaveModal);
    main.$container().on(`click${suffix}`, '[name=openEditModal]', main.onClickEditModal);
    main.$container().on(`click${suffix}`, '[name=removeItem]', main.onClickRemoveItem);
  };
  main.onClickRemoveItem = async function () {
    await $sl.services.request.delete({
      url: `https://localhost:4567/posts/` + main.$container(this).data('currentid')
    })
    main.plotItems(await main.getItems());
  }
  main.onClickEditModal = function () {
    main.getDataItem(main.$container(this).data('currentid'));
  }
  main.onClickOpenAddNewModal = () => {
    main.getDataItem();
  }
  main.getDataItem = async (id) => {
    let item = {
      modalTitle: 'Novo',
      id: '',
      title: '',
      categories: [''],
      content: '',
      version: ''
    };

    if (id) {
      item = await $sl.services.request.get({
        url: `https://localhost:4567/posts/` + id
      })

      item.modalTitle = 'editar'
    }

    main.$container('#exampleModalLabel').text(item.modalTitle);
    main.$container('[name=id]').val(item.id);
    main.$container('[name=titulo]').val(item.title);
    main.$container('[name=categorias]').val(item.categories);
    main.$container('[name=conteudo]').val(item.content);
    main.$container('[name=versao]').val(item.version);
  }
  main.onClickOpenSaveModal = async () => {
    let item = {
      id: main.$container('[name=id]').val(),
      title: main.$container('[name=titulo]').val(),
      categories: [main.$container('[name=categorias]').val()],
      content: main.$container('[name=conteudo]').val(),
      version: +main.$container('[name=versao]').val()
    };

    await $sl.services.request[!item.id ? 'post' : 'put']({
      url: `https://localhost:4567/posts` + (!item.id ? '' : '/' + item.id), data: item
    })

    main.plotItems(await main.getItems());
  }
  main.getItems = async () => {
    return await $sl.services.request.get({
      url: `https://localhost:4567/posts`
    })
  }
  main.plotItems = function (items) {

    let html = '';
    for (var i = 0; i < items.length; i++) {
      html +=
        `<tr>
    <td class="text-center">
      ${items[i].id}
    </td>
    <td>
      ${items[i].title}
    </td>
    <td>
      ${items[i].categories}
    </td>
    <td>
      ${items[i].content}
    </td>
    <td>
      ${items[i].version}
    </td>
    <td class="text-center">
        <span class="table-link fa-stack" name="openEditModal" data-toggle="modal" data-target="#formModal" data-currentId="${items[i].id}">
          <i class="fa fa-square fa-stack-2x"></i>
          <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
        </span>
    </td>
    <td class="text-center">
        <span class="table-link danger fa-stack" name="removeItem" data-currentId="${items[i].id}">
          <i class="fa fa-square fa-stack-2x"></i>
          <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
        </span>
    </td>
    </tr>`
    }

    main.$container('[name="tableBody"]').html('');
    main.$container('[name="tableBody"]').append(html);

    main.getItems();
  }
  $(document).ready(pb);
})(window.jQuery, $sl);