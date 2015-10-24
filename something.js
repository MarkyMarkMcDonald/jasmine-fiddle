{
  rewardGoodChildren: {
    "when child.isGood() returns true": {
      "calls child.reward()": "expect(child.reward).toHaveBeenCalled()",
      "calls child.giveCookie()": "expect(child.giveCookie).toHaveBeenCalled()"
    }
  }
}


// function rewardGoodChildren(child) {
    // if (child.isGood()) {
        // child.reward();
        // child.giveCookie();
    // }
// };

