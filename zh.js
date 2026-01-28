function main(config) {
  // 1. 定义策略组 (Proxy Groups)
  // 逻辑：按照你的习惯命名，去掉图标，使用正则动态提取节点
  config["proxy-groups"] = [
    {
      name: "🚀 节点选择",
      type: "select",
      "include-all": true, // 包含所有节点

      proxies: ["♻️ 自动选择", "DIRECT"],
    },
    {
      name: "♻️ 自动选择",
      type: "url-test",
      url: "http://www.apple.com/library/test/success.html",
      interval: 300,
      tolerance: 50,
      "include-all": true,

    },
    {
      name: "✈️ AI服务",
      type: "url-test", // 你之前的配置是 url-test，这里保持一致，也可以改为 select
      url: "http://www.apple.com/library/test/success.html",
      interval: 300,
      tolerance: 50,
      // 逻辑：AI通常使用新加坡(SG/SGS)、日本(JP)、美国(US)节点
      filter: "(?i)新加坡|Singapore|SG|🇸🇬|日本|Japan|JP|🇯🇵|美国|USA|US|🇺🇸",
      // 如果没有匹配到节点，回退到主策略
      proxies: ["🚀 节点选择"],
    }

    
  ];

  // 2. 定义规则集 (Rule Providers)
  // 逻辑：使用你脚本示例中的高质量规则源 (MetaCubeX 和 blackmatrix7)
  if (!config['rule-providers']) {
    config['rule-providers'] = {};
  }
  
  config["rule-providers"] = Object.assign(config["rule-providers"], {
    // 基础分类
    ai: {
      url: "https://ghfast.top/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ai-!cn.mrs",
      //path: "./ruleset/private.yaml",
      behavior: "domain",
      interval: 86400,
      format: "mrs",
      type: "http",
    },

  });

  // 3. 规则匹配 (Rules)
  // 逻辑：结合了你的 Emby 自定义规则、IP 直连规则以及脚本的规则集逻辑
  config["rules"] = [
    // --- 自定义 Emby 规则 ---
    "DOMAIN,cdn.lilyemby.my,DIRECT",
    "DOMAIN-SUFFIX,cdn.lilyemby.my,DIRECT",
    "DOMAIN-SUFFIX,cdn.lilyemby.com,DIRECT",
    "DOMAIN-SUFFIX,hkcdn.longemby.com,DIRECT",
    "DOMAIN-SUFFIX,jpcdn.longemby.com,DIRECT",
    
    // --- 规则集匹配 ---
    "RULE-SET,ai,✈️ AI服务",
   
    
    // 局域网防止漏网
    "IP-CIDR,0.0.0.0/8,DIRECT,no-resolve",
    "IP-CIDR,10.0.0.0/8,DIRECT,no-resolve",
    "IP-CIDR,127.0.0.0/8,DIRECT,no-resolve",
    "IP-CIDR,172.16.0.0/12,DIRECT,no-resolve",
    "IP-CIDR,192.168.0.0/16,DIRECT,no-resolve",
    
    // 最终兜底
    "MATCH,🚀 节点选择",
  ];

  return config;
}
