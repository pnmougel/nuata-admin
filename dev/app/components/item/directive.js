App.directive('item', function(ItemConfig) {
  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    link: function (scope) {
      scope.languages = ['en', 'fr'];

      // Build the names
      scope.names = [];
      scope.languages.forEach(function (lang) {
        if(lang in scope.item.name) {
          scope.names.push({
            lang: lang,
            content: scope.item.name[lang],
            isDefault: true
          })
        }
      });
      scope.languages.forEach(function (lang) {
        if(lang in scope.item.otherNames) {
          scope.item.otherNames[lang].forEach(function (name) {
            if(scope.item.name[lang] !== name) {
              scope.names.push({
                lang: lang,
                content: name,
                isDefault: false
              })
            }
          })
        }
      });

      // Build the categories
      scope.categories = [];
      scope.item.categories.forEach(function (category) {
        scope.categories.push({
          item: category,
          searchText: category.name.en
        });
      });

      // Build the descriptions
      scope.descriptions = [];
      scope.languages.forEach(function (lang) {
        if(lang in scope.item.description) {
          scope.descriptions.push({
            lang: lang,
            content: scope.item.description[lang]
          })
        }
      });

      scope.addName = function () {
        scope.names.push({lang: '', content: '', isDefault: false})
      };
      scope.removeName = function (name) {
        if(!name.isDefault) {
          scope.names.remove(name);
        }
      };
      scope.addDescription = function () {
        scope.descriptions.push({lang: '', content: ''});
      };

      scope.addCategory = function () {
        scope.categories.push({})
      };
      scope.removeCategory = function (category) {
        scope.categories.remove(category);
      };

      scope.autoComplete = function (foo) {
        return ItemConfig.category.resource.find({ name: foo.searchText }).$promise.then(function (items) {
          return items.items.map(function (item) {
            return {
              item: item,
              searchText: item.name.en
            }
          });
        });
      };
      scope.onItemSelect = function (item, model, label, category) {
        category.item = item.item;
        category.searchText = item.searchText;
      }

      scope.onTextClick = function ($event) {
        $event.target.select();
      };
      
      scope.toggleDefaultName = function (name, isToggled) {
        scope.names.forEach(function (otherName) {
          if(otherName.lang === name.lang) {
            otherName.isDefault = false;
          }
        });
        name.isDefault = isToggled;
      };

      scope.printItem = function () {
        console.log(scope.item);
      }
    },
    templateUrl: 'app/components/item/view.html'
  };
});
