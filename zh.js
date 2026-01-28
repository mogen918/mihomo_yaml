function main(config) {
  // -------------------------------------------------------
  // 1. 注入 Rule Providers (对应原配置 rule-anchor + rule-providers)
  // -------------------------------------------------------
  const providers = {
    "ai": {
      "type": "http",
      "interval": 86400,
      "behavior": "domain",
      "format": "mrs",
      "url": "https://ghfast.top/https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ai-!cn.mrs"
    }
  };

  // 确保 rule-providers 对象存在
  if (!config['rule-providers']) {
    config['rule-providers'] = {};
  }
  // 合并你的 provider
  Object.assign(config['rule-providers'], providers);

  // -------------------------------------------------------
  // 2. 定义规则列表 (Rules)
  // -------------------------------------------------------
  // 注意：这里是 JS 字符串数组格式。
  const rules = [
    // --- 顶部自定义规则 ---
    "RULE-SET,ai,✈️ AI服务",
    "DOMAIN,cdn.lilyemby.my,DIRECT",
    "DOMAIN-SUFFIX,cdn.lilyemby.my,DIRECT",
    "DOMAIN-SUFFIX,cdn.lilyemby.com,DIRECT",
    "DOMAIN-SUFFIX,hkcdn.longemby.com,DIRECT",
    "DOMAIN-SUFFIX,jpcdn.longemby.com,DIRECT",
    "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,🚀 节点选择",
    "DOMAIN-SUFFIX,services.googleapis.cn,🚀 节点选择",
    
    // --- 自定义 IP 规则 (保留了部分示例) ---
    "IP-CIDR,120.232.181.162/32,🚀 节点选择,no-resolve",
    "IP-CIDR,120.241.147.226/32,🚀 节点选择,no-resolve",
    "IP-CIDR,120.253.253.226/32,🚀 节点选择,no-resolve",
    "IP-CIDR,203.208.39.0/24,🚀 节点选择,no-resolve",
    // ... (中间省略了重复的 Google/Github IP 规则，如有需要请自行补全) ...

    // --- GitHub 相关规则 ---
    "DOMAIN-SUFFIX,atom.io,🚀 节点选择",
    "DOMAIN-SUFFIX,dependabot.com,🚀 节点选择",
    "DOMAIN-SUFFIX,ghcr.io,🚀 节点选择",
    "DOMAIN-SUFFIX,github.com,🚀 节点选择",
    "DOMAIN-SUFFIX,githubusercontent.com,🚀 节点选择",
    "DOMAIN-KEYWORD,github,🚀 节点选择",
    "DOMAIN-KEYWORD,turrit,🚀 节点选择",

    // --- 国内服务直连 (饿了么/百度/阿里/腾讯等) ---
    "DOMAIN-SUFFIX,ele.me,DIRECT",
    "DOMAIN-SUFFIX,baidu.com,DIRECT",
    "DOMAIN-KEYWORD,alicdn,DIRECT",
    "DOMAIN-KEYWORD,alipay,DIRECT",
    "DOMAIN-SUFFIX,qq.com,DIRECT",
    "DOMAIN-SUFFIX,weixin.com,DIRECT",
    "DOMAIN-SUFFIX,163.com,DIRECT",
    "DOMAIN-SUFFIX,bilibili.com,DIRECT",
    "DOMAIN-SUFFIX,iqiyi.com,DIRECT",
    
    // --- 局域网与特殊直连 ---
    "DOMAIN-SUFFIX,lan,DIRECT",
    "DOMAIN-SUFFIX,local,DIRECT",
    "IP-CIDR,0.0.0.0/8,DIRECT,no-resolve",
    "IP-CIDR,10.0.0.0/8,DIRECT,no-resolve",
    "IP-CIDR,127.0.0.0/8,DIRECT,no-resolve",
    "IP-CIDR,172.16.0.0/12,DIRECT,no-resolve",
    "IP-CIDR,192.168.0.0/16,DIRECT,no-resolve",
    
    // =========================================================
    // ⚠️ 重点：此处省略了你原文件中数千行 REJECT (广告拦截) 和
    // 数千行 IP-CIDR (CN IP 直连) 规则。
    //
    // 如果你必须使用硬编码列表，请使用下方的【正则替换技巧】
    // 转换后粘贴到这里。
    // =========================================================
    
    // 示例广告拦截
    "DOMAIN-KEYWORD,admarvel,REJECT",
    "DOMAIN-KEYWORD,admaster,REJECT",
    "DOMAIN-SUFFIX,114la.com,REJECT",
    "DOMAIN-SUFFIX,cnzz.com,REJECT",

    // 示例 CN IP 直连
    "IP-CIDR,8.128.0.0/10,DIRECT,no-resolve",
    "IP-CIDR,14.1.112.0/22,DIRECT,no-resolve",
    
    // --- 底部兜底规则 ---
    "GEOIP,CN,DIRECT,no-resolve",
    "MATCH,🚀 节点选择"
  ];

  // -------------------------------------------------------
  // 3. 覆盖配置
  // -------------------------------------------------------
  config["rules"] = rules;

  return config;
}