/**
 The `MetaRoute` class manages the application`s backend state and URLs. you can add a namespace
 by using a `path` option as the follow:

 ```javascript
 MetaRoute.map(Router, {path: "/admin"}, function() {
  this.route("dashboard"); //This will generate '/admin/dashboeard'
  this.resources("users");
});
 ```

 The class has two functions: `route` and `resources`. The `route` is the
 same as `Ember.router`s route`, Refer to the [routing guide](http://emberjs.com/guides/routing/)
 for documentation. The `resources` is easy to use by passing a resource`s `name`.

 @class MetaRoute
 */

var MetaRoute, MetaRouteClass;

MetaRouteClass = MetaRoute = (function() {
  function MetaRoute() {}

  MetaRoute.map = function(router, options, callback) {
    if (arguments.length === 2 && typeof options === "function") {
      callback = options;
      options = {};
    }

    this.router = router;
    this.path_prefix = options.path || "";

    return callback.call(new MetaRouteClass());
  };

  MetaRoute.prototype.resources = function(name) {
    var self;
    self = this;

    return MetaRouteClass.router.map(function() {

      this.route(name, {
        path: MetaRouteClass.path_prefix + "/" + name
      });
      this.route("" + name + ".edit", {
        path: self._action_edit_path(name)
      });
      this.route("" + name + ".show", {
        path: self._action_show_path(name)
      });
      return this.route("" + name + ".new", {
        path: self._new_path(name)
      });
    });
  };

  MetaRoute.prototype.route = function(name, options, callback) {
    var _isEmptyObject = function(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    };

    if (arguments.length === 2 && typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (arguments.length === 1) {
      options = {};
    }

    if (_isEmptyObject(options)) {
      options = {
        path: MetaRouteClass.path_prefix + "/" + name
      };
    } else {
      if (!!options.path) {
        options = {
          path: MetaRouteClass.path_prefix + "/" + options.path
        };
      }
    }

    return MetaRouteClass.router.map(function() {
      this.route(name, options, callback);
    });
  };

  MetaRoute.prototype._action_show_path = function(name) {
    return MetaRouteClass.path_prefix + "/" + name + "/:id/show";
  };

  MetaRoute.prototype._action_edit_path = function(name) {
    return MetaRouteClass.path_prefix + "/" + name + "/:id/edit";
  };

  MetaRoute.prototype._new_path = function(name) {
    return MetaRouteClass.path_prefix + "/" + name + "/new";
  };

  return MetaRoute;

})();

export default MetaRouteClass;
