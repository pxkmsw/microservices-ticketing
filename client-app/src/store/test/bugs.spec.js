import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addBug, resolveBug, getUnresolvedBugs, loadBugs } from "../bugs";
import configureStore from "../configureStore";

describe("bugsSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;
  const createState = () => ({
    entities: {
      bugs: {
        list: [],
      },
    },
  });

  it("should add a bug to the store if it's saved to the server", async () => {
    const bug = { description: "a" };
    fakeAxios.onPost("/bugs").reply(200, bug);

    await store.dispatch(addBug(bug));

    expect(bugsSlice().list).toContainEqual(bug);
  });

  it("should not add a bug to the store if it's not saved to the server", async () => {
    const bug = { description: "a" };
    fakeAxios.onPost("/bugs").reply(500);

    await store.dispatch(addBug(bug));

    expect(bugsSlice().list).toHaveLength(0);
  });

  it("should mark a bug as resolved if it's saved to the server", async () => {
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });
    fakeAxios.onPatch(`/bugs/1`).reply(200, { id: 1, resolved: true });

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    const resultBug = bugsSlice().list[0];
    expect(resultBug.resolved).toBe(true);
  });

  it("should not mark a bug as resolved if it's not saved to the server", async () => {
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });
    fakeAxios.onPatch(`/bugs/1`).reply(500);

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    const resultBug = bugsSlice().list[0];
    expect(resultBug.resolved).not.toBe(true);
  });

  describe("selectors", () => {
    it("should returns the unresolved bugs", async () => {
      const state = createState();
      state.entities.bugs.list = [{ id: 1, resolved: true }, { id: 2 }, { id: 3 }];

      const unresolvedBugs = getUnresolvedBugs(state);

      expect(unresolvedBugs).toHaveLength(2);
    });
  });

  describe("loading bugs", () => {
    describe("if bugs exist in the cache", async () => {
      it("should return the loaded bugs from the cache", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe("if bugs don't exist in the cache", () => {
      it("should return the loaded bugs from the server and save it to the store", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        expect(bugsSlice().list).toHaveLength(1);
      });

      describe("loading indicator", () => {
        it("should be true while bugs are fetching from the server", async () => {
          fakeAxios.onGet("/bugs").reply(() => {
            expect(bugsSlice().loading).toBe(true);
            return [200, [{ id: 1 }]];
          });

          await store.dispatch(loadBugs());
        });

        it("should be false after bugs are fetched from the server", async () => {
          fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });

        it("should be false if server responded with an error", async () => {
          fakeAxios.onGet("/bugs").reply(500);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });
      });
    });
  });
});
